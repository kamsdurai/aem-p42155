package com.etisalat.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class ElifeAddonsTileModelTest {

	private final AemContext context = new AemContext();

	private ElifeAddonsTileModel model;

	@BeforeEach
	public void setup() throws Exception {

		context.addModelsForClasses(ElifeAddonsTileModel.class);
		context.load().json("/com/etisalat/core/models/ElifeAddonsTileModelTest.json", "/content/etisalat");
		context.currentResource("/content/etisalat/en/jcr:content/root/container/elifeaddonstile");
		model = context.request().adaptTo(ElifeAddonsTileModel.class);
	}

	@Test
	void testGetBrandText() {
		assertEquals("ELife ELite", model.getBrandText());
	}

	@Test
	void testGetProductTitle() {
		assertEquals("eLite 299", model.getProductTitle());
	}

	@Test
	void testGetProductPrice() {
		assertEquals("299", model.getProductPrice());
	}

	@Test
	void testGetProductOldPriceText() {
		assertEquals("Previous Price", model.getProductOldPriceText());
	}

	@Test
	void testGetProductOldPrice() {
		assertEquals("236", model.getProductOldPrice());
	}

	@Test
	void testGetProductCurrency() {
		assertEquals("AED", model.getProductCurrency());
	}

	@Test
	void testGetVatInclude() {
		assertEquals("5% VAT excluded", model.getVatInclude());
	}

	@Test
	void testGetAvailabilityButtonText() {
		assertEquals("Buy Now", model.getAvailabilityButtonText());
	}

	@Test
	void testGetAvailabilityButtonLink() {
		assertEquals("/content/products", model.getAvailabilityButtonLink());
	}

	@Test
	void testGetBuyNowAltText() {
		assertEquals("Buy now", model.getBuyNowAltText());
	}

}
