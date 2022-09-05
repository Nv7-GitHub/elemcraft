import { writable, type Writable } from "svelte/store";
import type { PromptResult, UI } from "./servers";

export let connected = writable(false);
export let prompt_result: Writable<PromptResult | null> = writable(null);
export let component: Writable<Component> = writable({type: 'progress', value: {
  text: 'Initializing...',
  progress: 0,
}}) 

export interface Component {
  type: 'progress' | 'prompt';
  value: ProgressComponent | PromptComponent,
}

export interface ProgressComponent {
  text: string;
  progress: number;
}

export interface PromptComponent {
  title: string;
  inputPlaceholders: string[];
  buttons: string[];
}

export class ConnectUI implements UI {
  progress(text: string, progress: number): void {
    console.log("HI");
    component.set({
      type: 'progress',
      value: {
        text,
        progress,
      },
    });
  }

  prompt(title: string, inputPlaceholders: string[], buttons: string[]): Promise<PromptResult> {
    component.set({
      type: 'prompt',
      value: {
        title,
        inputPlaceholders,
        buttons,
      },
    });

    return new Promise((resolve) => {
      prompt_result.subscribe((v) => {
        if (v) {
          resolve(v);
        }
      });
    });
  }
}