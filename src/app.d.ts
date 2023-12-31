declare namespace App {
  interface Locals {
    theme: string;
  }

  interface PageData {
    metadata: {
      title: string;
      description: string;
      image: string;
      url: string;
    };
  }
}
