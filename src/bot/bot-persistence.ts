import { ChannelState } from '@bot/channel-state';
import fs from 'fs/promises';
import path from 'path';

export class BotPersistence {
  private readonly states = new Map<string, ChannelState>();

  constructor(private readonly savesDir: string) {}

  async init() {
    try {
      await fs.mkdir(this.savesDir, { recursive: true });

      const entries = await fs.readdir(this.savesDir, { withFileTypes: true });
      await Promise.all(
        entries
          .filter((entry) => entry.isFile())
          .map(async (entry) =>
            this.loadState(path.join(this.savesDir, entry.name))
          )
      );
    } catch (ignored) {}
  }

  set(key: string, value: ChannelState): void {
    this.states.set(key, value);
  }

  get(id: string): ChannelState | undefined {
    return this.states.get(id);
  }

  async updateIfChanged(old: ChannelState, id: string) {
    const current = this.get(id);
    if (
      current &&
      (old.prefix != current?.prefix || old.stepSize != current?.stepSize)
    ) {
      return this.saveState(current, id);
    }
  }

  private async loadState(file: string) {
    try {
      const content = await fs.readFile(file);
      const data = JSON.parse(content.toString());

      // the only required field
      if (typeof data.stepSize === 'number') {
        this.set(path.basename(file, '.json'), data as ChannelState);
      }
    } catch (ignored) {}
  }

  private async saveState(current: ChannelState, id: string) {
    try {
      const data = JSON.stringify({
        stepSize: current.stepSize,
        prefix: current.prefix,
      });

      await fs.writeFile(path.join(this.savesDir, id) + '.json', data);
    } catch (ignored) {}
  }
}
