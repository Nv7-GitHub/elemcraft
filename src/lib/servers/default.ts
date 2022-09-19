import type { Element, Result, Server, UI } from "$lib/servers";
import PocketBase, { User } from "pocketbase";

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
      return;
    }

    // Login
    let res = await ui.prompt("Login", [{placeholder: "Email", type: "email"}, {placeholder: "Password", type: "password"}, {placeholder: "Nickname", type: "text"}], ["Register", "Login"]);

    // Auth
    if (res.button == 1) {
      ui.progress("Logging in...", 0);
      this.u = (await this.client.users.authViaEmail(res.values[0], res.values[1])).user;
      if (this.u.profile!["name"] != res.values[2]) { // Nickname
        ui.progress("Logging in...", 0.5);
        this.client.records.update("profiles", this.u.profile!.id, {name: res.values[2]});
        await this.refresh_user();
      }
    } else {
      ui.progress("Registering...", 0);
      this.u = await this.client.users.create({email: res.values[0], password: res.values[1], name: res.values[2], inv: [0, 1, 2, 3]});
    }
  }

  name(): string {
    return this.u!.profile!["name"];
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

  suggest(recipe: number[][], res: Element): Promise<Result> {
    console.log("hi");
    throw new Error("Method not implemented.");
  }

  existingSuggestions(recipe: number[][]): Promise<Element[]> {
    console.log("hi");
    throw new Error("Method not implemented.");
  }

  creator(): Promise<string> {
    console.log("hi");
    throw new Error("Method not implemented.");
  }
}