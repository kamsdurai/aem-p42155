package com.etisalat.core.servlets;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.spi.ImplementationPicker;
import org.apache.sling.servlethelpers.MockSlingHttpServletRequest;
import org.apache.sling.servlethelpers.MockSlingHttpServletResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.etisalat.core.services.CustomFormHandlingService;
import com.etisalat.core.services.EtisalatApiService;
import com.google.gson.JsonParseException;
import com.google.gson.JsonSyntaxException;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class SendNotificationServletTest {

    public AemContext context = new AemContext();

	@Mock
	private EtisalatApiService etisalatApiService;
	
	@Mock
	private CustomFormHandlingService customFormHandlingService;

	@Mock
	SlingHttpServletResponse slingHttpServletResponse;

	@Mock
	SlingHttpServletRequest slingHttpServletRequest;

	@Mock 
	ResourceResolver resolver;

	@Mock
	PageManager pageManager;

	@Mock
	Resource resource;

	@Mock 
	Page currentPage;	

	@InjectMocks
	SendNotificationServlet sendNotificationServlet = new SendNotificationServlet();


	@BeforeEach
	void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);		
	}

	@Test
	void testDoPost(AemContext context) throws Exception {		
		context.create().page("/content/etisalat/en", "/apps/etisalat/page");
		context.currentPage("/content/etisalat/en");
	    MockSlingHttpServletRequest request = context.request();
	    MockSlingHttpServletResponse response = context.response();	   
	    Assertions.assertDoesNotThrow(() ->sendNotificationServlet.doPost(request, response));	      	   
	  }

	@Test
	void testSendApiUrl() throws NoSuchFieldException,JsonSyntaxException, JsonParseException {		
		when(etisalatApiService.getContactUsApiUrl()).thenReturn("test/api");
		assertEquals("test/api", sendNotificationServlet.getSendNotificationApiUrl());
	} 
}
