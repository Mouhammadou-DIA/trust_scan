"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle("FATI - Fake-site Analysis & Threat Intelligence")
        .setDescription("Extension anti-phishing avec analyse URL, backlinks, liens internes et NLP")
        .setVersion("1.0")
        .setContact("FATI API", "https://github.com/fati-api", "contact@fati.com")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document, {
        customSiteTitle: "SEO TOOLS API",
        customfavIcon: "https://raw.githubusercontent.com/oguzhan18/seo-tools-api/main/assests/seo-tools-api-logo.png",
        customJs: [
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js"
        ],
        customCssUrl: [
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css"
        ]
    });
    app.enableCors({
        origin: '*',
    });
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "uploads"));
    await app.listen(3002);
}
bootstrap();
//# sourceMappingURL=main.js.map