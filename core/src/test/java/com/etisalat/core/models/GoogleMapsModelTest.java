package com.etisalat.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import com.etisalat.core.services.impl.GoogleMapsServiceImpl;
import com.etisalat.core.services.impl.StoreLocatorServiceImpl;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(AemContextExtension.class)
class GoogleMapsModelTest {
	private final AemContext context = new AemContext();

	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(GoogleMapsModel.class);  
		context.registerInjectActivateService( new GoogleMapsServiceImpl(),"getGoogleUrl","https://maps.googleapis.com/maps/api/js?",
				"getGoogleKey","key",
				"getGoogleContactUsUrl","/test",
				"getGoogleCaptchaV2EtisalatAppKey","6Lf",
				"getGoogleCaptchaV2HiuAppKey","6Ld",
				"getGoogleCaptchaV2EwalletAppKey","6Ld",
				"getGoogleCaptchaInvisibleEtisalatAppKey","6Ld" );
		context.registerInjectActivateService( new StoreLocatorServiceImpl(),"getStoreLocatorUrl","test");    
	}

	@ParameterizedTest
	@ValueSource(strings = { "/content/etisalat/en", "/content/hiuapp/en", "/content/ewallet/en" })
	void testEtisalatCaptchaKey(String pagePath) { 
		context.create().page(pagePath, "/apps/etisalat/page");
		context.request().setAttribute("currentPage", context.currentPage(pagePath));
		GoogleMapsModel googleMapsModel = context.request().adaptTo(GoogleMapsModel.class);	
		assertNotNull(googleMapsModel.getCaptchaV2());
	} 

	@Test
	void testGoogleMapModelMethods() {
		context.create().page("/content/etisalat/en", "/apps/etisalat/page");
		context.request().setAttribute("currentPage", context.currentPage("/content/etisalat/en"));
		GoogleMapsModel googleMapsModel = context.request().adaptTo(GoogleMapsModel.class);	
		assertNotNull(googleMapsModel.getCaptchaInvisible());
		assertNotNull(googleMapsModel.getCaptchaV3());
		assertNotNull(googleMapsModel.getGoogleContactUrl());
		assertNotNull(googleMapsModel.getUrl());
		assertNotNull(googleMapsModel.getStoreLocatorUrl());
	}
}
