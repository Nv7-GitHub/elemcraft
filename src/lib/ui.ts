import { writable, type Writable } from "svelte/store";
import type { PromptResult, UI, Input } from "./servers";

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
  inputs: Input[];
  buttons: string[];
}

export class ConnectUI implements UI {
  progress(text: string, progress: number): void {
    component.set({
      type: 'progress',
      value: {
        text,
        progress,
      },
    });
  }

  prompt(title: string, inputs: Input[], buttons: string[]): Promise<PromptResult> {
    component.set({
      type: 'prompt',
      value: {
        title,
        inputs,
        buttons,
      },
    });

    prompt_result.set(null);
    return new Promise((resolve) => {
      prompt_result.subscribe((v) => {
        if (v) {
          resolve(v);
        }
      });
    });
  }
}