import type { Element, PromptResult, Result, Server, UI } from "$lib/servers";
import PocketBase, { ClientResponseError, User } from "pocketbase";

export class DefaultServer implements Server {
  client: PocketBase | null = null;
  u: User | null = null;

  async refresh_user(): Promise<void> {
    await this.client!.users.refresh();
    this.u = this.client!.authStore.model as User;
  }

  async connect(ui: UI): Promise<void> {
    this.client = new PocketBase("http://127.0.0.1:8090/");

    if (this.client.authStore.model) {
      ui.progress("Logging in...", 0);
      await this.refresh_user();

      // Inventory
      if (!Array.isArray(this.u!.profile!["inv"]) || this.u!.profile!["inv"].length < 4) {
        ui.progress("Logging in...", 0.75);
        this.client.records.update("profiles", this.u!.profile!.id, {inv: [0, 1, 2, 3]});
        await this.refresh_user();
      }
      return;
    }

    // Login
    let success = false;
    let res: PromptResult;
    while (!success) {  
      res = await ui.prompt("Login", [{placeholder: "Email", type: "email"}, {placeholder: "Password", type: "password"}, {placeholder: "Nickname", type: "text"}], ["Register", "Login"])

      try {
        if (res.button == 1) {
          ui.progress("Logging in...", 0);

          this.u = (await this.client.users.authViaEmail(res.values[0], res.values[1])).user;
          success = true;
        } else {
          this.u = await this.client.users.create({
            email: res.values[0],
            password: res.values[1], 
            passwordConfirm: res.values[1]
          });
          success = true;
    
          ui.progress("Registering...", 0.5);
          await this.client.records.update('profiles', this.u!.id, {
            name: res.values[2], 
            inv: [0, 1, 2, 3],
          })
          ui.progress("Registering...", 0.75);
          await this.refresh_user();
        }
      } catch (e: any) {
        // Show error
        let data = e.data.data;
        if (Object.keys(data).length == 0) {
          alert(e.data.message);
        } else {
          let k = Object.keys(data)[0];
          alert(k + ": " + data[k].message);
        }
      }
    }

    // Nickname
    if (this.u!.profile!["name"] != res!.values[2]) {
      ui.progress("Logging in...", 0.5);
      this.client.records.update("profiles", this.u!.profile!.id, {name: res!.values[2]});
      await this.refresh_user();
    }
  }

  name(): string {
    return "Default Server";
  }

  async element(id: number): Promise<Element> {
    let res = await fetch(this.client?.baseUrl + "api/element?id=" + id);
    let el = await res.json();
    return el;
  }

  async inventory(): Promise<number[]> {
    return this.u!.profile!["inv"];
  }

  async combine(recipe: number[][]): Promise<Result> {
    if (!this.client) {
      return null;
    }
    let res = await this.client.send("api/combine", {
      method: "POST",
      body: JSON.stringify(recipe),
    })
    if (res) {
      await this.refresh_user();
    }
    return res;
  }

  async suggest(recipe: number[][], result: Element): Promise<Result> {
    let res = await this.client?.send("api/suggest", {
      method: "POST",
      body: JSON.stringify({
        recipe,
        name: result.name,
        color: result.color,
        description: result.description,
      }),
    })
    return res;
  }

  async existingSuggestions(recipe: number[][]): Promise<Element[]> {
    return this.client?.send("api/existing", {
      method: "POST",
      body: JSON.stringify(recipe),
    });
  }

  async creator(): Promise<string> {
    return this.u!.profile!["name"];
  }

  canSuggest(recipe: number[][]): boolean {
    let v = recipe.map(r => r.filter(v => v >= 0).length).filter(v => v > 0);
    return v.some(v => v >= 2) || v.length >= 2; // at least 2x1
  }
}