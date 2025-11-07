<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


----------------------------------------------------------------------------

## Summary of Core NestJS Concepts

This section summarizes the key NestJS principles used in this project, based on our discussion.

### 1. Modular Design (`@Module`)

**Question:** Why isn't `AuthController` listed in the main `app.module.ts`?

**Answer:** NestJS uses modules to organize the application into logical "boxes."

* **Feature Modules:** `AuthModule`, `UsersModule`, etc., are self-contained boxes. They define their own controllers and services (providers). For example, `auth.module.ts` lists `AuthController` in its `controllers` array.
* **Root Module (`AppModule`):** The main `app.module.ts` imports these *modules* (the "boxes"), not the individual files inside them.
* **Benefit:** This keeps your main `AppModule` clean and makes your features reusable and organized. When you import `AuthModule`, NestJS automatically makes all of its exported controllers and services available to the rest of the app.

### 2. Dependency Injection (`@Injectable`)

**Question:** What is `@Injectable()` and when is it used?

**Answer:** `@Injectable()` is a decorator that marks a class as a **Provider** that can be managed by the NestJS dependency injection (DI) system.

* **Who needs it?** `Services`, `Pipes`, `Guards`, and `Interceptors`.
* **What does it do?** It tells NestJS, "You are responsible for creating an instance of this class and 'injecting' it into other classes that need it."
* **How it works (The DI Pattern):**
    1.  **Provider:** A class like `UsersService` is marked with `@Injectable()`.
    2.  **Consumer:** A class like `UsersController` "asks" for the service in its `constructor`:
        ```typescript
        constructor(private usersService: UsersService) {}
        ```
    3.  **Module:** The `users.module.ts` file registers the `UsersService` in its `providers` array.

    NestJS handles the rest, creating a single instance (singleton) of `UsersService` and passing it to `UsersController`. This saves you from ever having to write `new UsersService()`.

### 3. Global Validation (`ValidationPipe`)

**Question:** What does `app.useGlobalPipes(new ValidationPipe())` do?

**Answer:** This line, added in `main.ts`, enables powerful, automatic validation for **every single request** that hits your application.

* **How it works:** It uses the `class-validator` library.
* **Your Job:** You create **DTOs** (Data Transfer Objects) for your request bodies using classes with validation decorators.
    ```typescript
    // src/posts/dto/create-post.dto.ts
    import { IsString, IsNotEmpty } from 'class-validator';

    export class CreatePostDto {
      @IsString()
      @IsNotEmpty()
      title: string;
    
      @IsString()
      content: string;
    }
    ```
* **Nest's Job:** When a request hits a controller, the `ValidationPipe` automatically checks the `body` against the `CreatePostDto` rules.
    * **If valid:** The request continues to your controller.
    * **If invalid:** The pipe **automatically stops** the request and sends a `400 Bad Request` response to the client with a list of all errors (e.g., `"title should not be empty"`).

This keeps your controller logic clean from messy `if`-checks.
