package com.etisalat.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the ProductDetailsItem Sling modal Class
 */
@ExtendWith(AemContextExtension.class)
class ProductDetailsItemTest {

	private final AemContext context = new AemContext();

	private static final String CONTENT_ROOT = "/content";
	private static final String CURRENT_PAGE = "/content/productdetails";

	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	protected static final String PRODUCT_DATA = TEST_PAGE_CONTAINER_ROOT + "/productdetail/productItems/item0";

	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(ProductDetailsItem.class);
		context.load().json("/com/etisalat/core/models/ProductDetailsImplTest.json", CONTENT_ROOT);
	}

	@Test
	void testProductDetailsItem() {
		final String expectedofferText = "*Double your minutes for 3 months";
		final String expectedproductTitle = "Business First Plus";
		final String expectedproductSubTitle = "National 110";
		final String expectedproductDesc = "Product Description";
		final String expectedproductPrice = "50";
		final String expectedproductCurrency = "AED";
		final String expectedvatInclude = "5% VAT Include";
		final String expectedmoreInfoLabel = "More Info";
		final String expectedmoreInfoDesc = "More Info Description";
		final String expectedcontract = "12 months contract";
		final String expectedbuyNowButton = "Buy now";
		final String expectedbuttonLink = "htttp://www.google.com";

		Resource resource = context.resourceResolver().getResource(PRODUCT_DATA);
		ProductDetailsItem item = resource.adaptTo(ProductDetailsItem.class);
        item.setOfferText(expectedofferText);
		assertEquals(expectedofferText, item.getOfferText());
		item.setProductTitle(expectedproductTitle);
		assertEquals(expectedproductTitle, item.getProductTitle());
		item.setProductSubTitle(expectedproductSubTitle);
		assertEquals(expectedproductSubTitle, item.getProductSubTitle());
		item.setProductDesc(expectedproductDesc);
		assertEquals(expectedproductDesc, item.getProductDesc());
		item.setProductPrice(expectedproductPrice);
		assertEquals(expectedproductPrice, item.getProductPrice());
		item.setProductCurrency(expectedproductCurrency);
		assertEquals(expectedproductCurrency, item.getProductCurrency());
		item.setVatInclude(expectedvatInclude);
		assertEquals(expectedvatInclude, item.getVatInclude());
		item.setMoreInfoLabel(expectedmoreInfoLabel);
		assertEquals(expectedmoreInfoLabel, item.getMoreInfoLabel());
		item.setMoreInfoDesc(expectedmoreInfoDesc);
		assertEquals(expectedmoreInfoDesc, item.getMoreInfoDesc());
		item.setContract(expectedcontract);
		assertEquals(expectedcontract, item.getContract());
		item.setBuyNowButton(expectedbuyNowButton);
		assertEquals(expectedbuyNowButton, item.getBuyNowButton());
		item.setButtonLink(expectedbuttonLink);
		assertEquals(expectedbuttonLink, item.getButtonLink());

	}

}
