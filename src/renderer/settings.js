import path from 'path';
import fs from 'fs';
import { getDataHome } from 'platform-folders';

const appName = 'SatisfactoryModLauncher';

const settingsFilePath = path.join(getDataHome(), appName, 'settings.json');

export function getSetting(name, defaultValue) {
  try {
    const settings = JSON.parse(fs.readFileSync(settingsFilePath));
    return settings[name] || defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export function saveSetting(name, value) {
  let settings = {};
  try {
    settings = JSON.parse(fs.readFileSync(settingsFilePath));
  } catch (e) {
    // Settings did not exist
  }
  settings[name] = value;
  if (!fs.existsSync(path.dirname(settingsFilePath))) {
    fs.mkdirSync(path.dirname(settingsFilePath), { recursive: true });
  }
  fs.writeFileSync(settingsFilePath, JSON.stringify(settings));
}
