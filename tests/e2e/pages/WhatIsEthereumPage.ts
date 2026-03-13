import { Page } from "@playwright/test"

import { MdPage } from "./MdPage"

/**
 * Page Object Model for the What is Ethereum page
 */
export class WhatIsEthereumPage extends MdPage {
  constructor(page: Page) {
    super(page, "/en/what-is-ethereum/")
  }
}
