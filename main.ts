import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle("FATI - Fake-site Analysis & Threat Intelligence")
    .setDescription("Extension anti-phishing avec analyse URL, backlinks, liens internes et NLP")
    .setVersion("1.0")
    .setContact("FATI API", "https://github.com/fati-api", "contact@fati.com")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
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
  app.useStaticAssets(join(__dirname, "..", "uploads"));

  await app.listen(3002);
}

bootstrap();
