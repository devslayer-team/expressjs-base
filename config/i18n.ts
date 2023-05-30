import i18next from "i18next";
import i18nextFsBackend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-express-middleware";
import { join } from "path";

class I18n {
  public i18n = i18next;
  constructor() {
    this.i18n
      .use(i18nextFsBackend)
      .use(i18nextMiddleware.LanguageDetector)
      .init({
        initImmediate: false,
        lng: "en",
        fallbackLng: "en",
        preload: ["en", "vi"],
        supportedLngs: ["en", "vi"],
        ns: ["translation"],
        defaultNS: "translation",
        backend: {
          loadPath: join(__dirname, "../locales/{{lng}}/{{ns}}.json"),
          addPath: join(__dirname, "../locales/{{lng}}/{{ns}}.missing.json"),
          //   parse: (data: any) => {console.log(data)}
        },
        saveMissing: true,
      });
  }

  t(key: string, options?: any) {
    return this.i18n.t(key, options);
  }

  changeLanguage(lang: string) {
    return this.i18n.changeLanguage(lang);
  }

  getLanguage() {
    return this.i18n.language;
  }

  getSupportedLanguages() {
    return this.i18n.options.supportedLngs;
  }
}

const i18n = new I18n();

export { i18n };
