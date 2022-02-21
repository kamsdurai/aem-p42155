package com.etisalat.core.services;

public interface GoogleMapsService {

	/**
	 * Returns a google map url.
	 *
	 * @return
	 */
	public String getGoogleUrl();

	/**
	 * Returns a google site map key.
	 *
	 * @return
	 */
	public String getGoogleKey();

	/**
	 * Returns a google contact us url.
	 *
	 * @return
	 */
	String getGoogleContactUsUrl();

	/**
	 * Returns Google CAPTCHA v3 site key.
	 *
	 * @return
	 */
	String getCaptchaV3SiteKey();

	/**
	 * Returns Etisalat Google CAPTCHA invisible site key.
	 *
	 * @return
	 */
	String getCaptchaInvisibleEtisalatAppKey();

	/**
	 * Returns HiuApp Google CAPTCHA v2 site key.
	 *
	 * @return
	 */
	String getCaptchaV2HiuAppKey();

	/**
	 * Returns Ewallet Google CAPTCHA v2 site key.
	 *
	 * @return
	 */

	String getCaptchaV2EwalletAppKey();

	/**
	 * Returns Etisalat Google CAPTCHA v2 site key.
	 *
	 * @return
	 */

	String getCaptchaV2EtisalatAppKey();
}
