export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.addAdvertisementButton = page.getByRole("button", {
      name: "Postavite oglas",
    });
    this.categoryInput = page.locator("#groupSuggestInputText");
    this.iPhoneSelect = page.locator('button[aria-label="Mobilni telefoni"]');
    this.productName = page.locator('[id="name"]');
    this.productPrice = page.locator('[id="price"]');
    this.currencyRadio = page.locator('[aria-label="rsd"]');
    this.currencyRadioEur = page.locator('input[aria-label="eur"]');
    this.paymentCheckbox = page.locator('[id="priceFixedyes"]');
    this.textField = page.locator('[id="text-field-editor_ifr"]');
    this.productStateNew = page.locator('[aria-label="as-new"]');
    this.productStateUsed = page.locator('[aria-label="used"]');
    this.productStateDamaged = page.locator('[aria-label="damaged"]');
    this.availableNow = page.locator('inout[aria-label="immediateAvailable"]');
    this.deliveryMethod = page.locator('[id="courierDeliveryyes"]');
    this.localPickut = page.locator('[id="localPickupyes"]');
    this.selectLocation = page.locator(
      '[id="react-select-locationId-placeholder]'
    );
    this.ownerName = page.locator('[id="owner"]');
    this.itemPromotionButton = page.locator(
      'button[aria-label="Standardna vidljivost"]'
    );
    this.personRadioButton = page.locator('input[aria-label="person"]');
    this.submitButton = page.locator('button[aria-label="Objavi oglas"]');
  }
}
