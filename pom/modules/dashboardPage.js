import { expect } from "@playwright/test";

export class DashboardPage {
  constructor(page) {
    this.page = page;

    this.addAdvertisementButton = page.getByRole("button", {
      name: "Postavite oglas",
    });
    this.submitButton = page
      .locator('button[aria-label="Postavite oglas"]')
      .nth(0);
    this.goNextButton = page.locator('button[aria-label="Sledeće"]').nth(0);
    this.categoryInput = page.locator('[id="groupSuggestInputText"]');
    this.iPhoneSelect = page.locator('button[aria-label="Mobilni telefoni"]');
    this.productName = page.locator('[id="name"]');
    this.productPrice = page.locator('[id="price"]');
    this.textField = page
      .frameLocator("#text-field-editor_ifr")
      .locator("body");
    this.currencyRadio = page.locator('[aria-label="rsd"]');
    this.currencyRadioEur = page.locator('input[aria-label="eur"]');
    this.paymentCheckbox = page.locator(
      'label[class*="Checkbox_container"]:has(input#priceFixedyes)'
    );
    this.productStateNew = page.locator('[aria-label="as-new"]');
    this.productStateUsed = page.locator('[aria-label="used"]');
    this.productStateDamaged = page.locator('[aria-label="damaged"]');
    this.availableNow = page.locator('input[aria-label="immediateAvailable"]');
    this.deliveryMethod = page.locator('[id="courierDeliveryyes"]');
    this.localPickut = page.locator('[id="localPickupyes"]');
    this.selectLocation = page.locator('[id="react-select-locationId-input"]');
    this.ownerName = page.locator('[id="owner"]');
    this.itemPromotionButton = page.locator(
      'button[aria-label="Standardna vidljivost"]'
    );
    this.personRadioButton = page.locator('input[aria-label="person"]');
    this.acceptRulesCheckbox = page.locator(
      'label[class*="Checkbox_container__7TDME"]:has(input#acceptyes)'
    );
    this.carLink = page.locator('[aria-label="Automobili"]').nth(1);
    this.priceDropdown = page.locator(
      'span[class*="SearchTag_priceTagText__NYzSb"]'
    );
    this.priceTo = page.locator('input[aria-label="priceTo"]');
    this.priceFrom = page.locator('input[aria-label="priceFrom"]');
    this.applyFilter = page.locator('button[aria-label="Primeni filtere"]');
    this.sortFilter = page.locator('button[aria-label="Sortiraj"]');
    this.closeAccountWindow = page
      .locator('button[aria-label="button"]')
      .nth(2);
  }

  async createAdvertisement(advertisementData) {
    try {
      await this.addAdvertisementButton.click();

      await this.fillCategory(advertisementData.category);

      await this.fillProductDetails(advertisementData);

      await this.setPriceDetails(advertisementData);

      await this.setProductCondition(advertisementData.productState);

      await this.setAvailabilityAndDelivery(advertisementData);

      await this.setLocationAndContact(advertisementData);
      await this.setPromotionType();
      await this.acceptRulesCheckbox.check();
      await this.submitButton.click();
    } catch (error) {
      console.error("Error creating advertisement:", error);
      throw error;
    }
  }

  async fillCategory(category) {
    await this.categoryInput.fill(category);
    await this.iPhoneSelect.waitFor({ state: "visible" });
    await this.iPhoneSelect.click();
  }

  async clickNextButton() {
    await this.goNextButton.waitFor({ state: "visible" });
    await expect(this.goNextButton).toBeEnabled();
    await this.goNextButton.click();
  }

  async fillProductDetails({ productName, productPrice, description }) {
    await this.productName.fill(productName);
    await this.productPrice.fill(productPrice);
    await this.textField.scrollIntoViewIfNeeded();
    await expect(this.textField).toBeVisible();
    await this.textField.click();
    await this.textField.fill(description);
  }

  async setPriceDetails(data) {
    if (data.currency === "eur") {
      await this.currencyRadioEur.check();
    } else {
      await this.currencyRadio.check();
    }
    if (data.isPriceFixed) {
      await this.paymentCheckbox.waitFor({ state: "visible" });
      await this.paymentCheckbox.check();
    }
  }

  async setProductCondition(state) {
    const stateMap = {
      new: this.productStateNew,
      used: this.productStateUsed,
      damaged: this.productStateDamaged,
    };
    await stateMap[state]?.click();
  }

  async setAvailabilityAndDelivery(data) {
    if (data.isAvailableNow) {
      await this.availableNow.check();
    }
    if (data.deliveryMethods.courier) {
      await this.deliveryMethod.check();
    }
    if (data.deliveryMethods.localPickup) {
      await this.localPickut.check();
    }
  }

  async setLocationAndContact(data) {
    await this.selectLocation.fill(data.location);
    await this.page.keyboard.press("Enter");
    await this.ownerName.fill(data.ownerName);
    await this.clickNextButton();
    await expect(this.itemPromotionButton).toBeVisible();
  }

  async setPromotionType() {
    await this.itemPromotionButton.click();
    await this.clickNextButton();
  }
}
