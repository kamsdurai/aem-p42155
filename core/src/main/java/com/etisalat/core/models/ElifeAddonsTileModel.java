package com.etisalat.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.etisalat.core.util.CommonUtility;

/**
 * The Class ElifeAddonsTileModel is used to get the values of the Elife Addons
 * Tile component at /apps/etisalat/components/elifeaddonstile.
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ElifeAddonsTileModel {

	/** The brand text. */
	@ValueMapValue
	private String brandText;

	/** The product title. */
	@ValueMapValue
	private String productTitle;

	/** The product price. */
	@ValueMapValue
	private String productPrice;

	/** The product old price text. */
	@ValueMapValue
	private String productOldPriceText;

	/** The product old price. */
	@ValueMapValue
	private String productOldPrice;

	/** The product currency. */
	@ValueMapValue
	private String productCurrency;

	/** The vat include. */
	@ValueMapValue
	private String vatInclude;

	/** The availability button text. */
	@ValueMapValue
	private String availabilityButtonText;

	/** The availability button link. */
	@ValueMapValue
	private String availabilityButtonLink;

	/** The buy now alt text. */
	@ValueMapValue
	private String buyNowAltText;

	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;

	/**
	 * Gets the brand text.
	 *
	 * @return the brand text
	 */
	public String getBrandText() {
		return brandText;
	}

	/**
	 * Gets the product title.
	 *
	 * @return the product title
	 */
	public String getProductTitle() {
		return productTitle;
	}

	/**
	 * Gets the product price.
	 *
	 * @return the product price
	 */
	public String getProductPrice() {
		return productPrice;
	}

	/**
	 * Gets the product old price text.
	 *
	 * @return the product old price text
	 */
	public String getProductOldPriceText() {
		return productOldPriceText;
	}

	/**
	 * Gets the product old price.
	 *
	 * @return the product old price
	 */
	public String getProductOldPrice() {
		return productOldPrice;
	}

	/**
	 * Gets the product currency.
	 *
	 * @return the product currency
	 */
	public String getProductCurrency() {
		return productCurrency;
	}

	/**
	 * Gets the vat include.
	 *
	 * @return the vat include
	 */
	public String getVatInclude() {
		return vatInclude;
	}

	/**
	 * Gets the availability button text.
	 *
	 * @return the availability button text
	 */
	public String getAvailabilityButtonText() {
		return availabilityButtonText;
	}

	/**
	 * Gets the availability button link.
	 *
	 * @return the availability button link
	 */
	public String getAvailabilityButtonLink() {
		return CommonUtility.appendHtmlExtensionToPage(resourceResolver, availabilityButtonLink);
	}

	/**
	 * Gets the buy now alt text.
	 *
	 * @return the buy now alt text
	 */
	public String getBuyNowAltText() {
		return buyNowAltText;
	}
}
