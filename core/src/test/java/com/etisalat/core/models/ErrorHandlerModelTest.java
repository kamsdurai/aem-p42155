package com.etisalat.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.scripting.SlingBindings;
import org.apache.sling.models.impl.ResourceTypeBasedResourcePicker;
import org.apache.sling.models.spi.ImplementationPicker;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

 /**
 * JUnit test verifying the ErrorHandlerModel
 */
 @ExtendWith(AemContextExtension.class)
 public class ErrorHandlerModelTest {
	
 private final AemContext context = new AemContext();
 
 private static final String CONTENT_ROOT = "/content";
 private static final String CURRENT_PAGE = "/content/errorpage/etisalat";

 private static final String ERROR_PAGE = CURRENT_PAGE + "/language-master/en/sample/testpage";

 @Mock
 private SlingHttpServletResponse response;
  	  
 @BeforeEach
 public void setup() throws Exception {
  context.addModelsForClasses(ErrorHandlerModel.class);		
  context.load().json("/com/etisalat/core/models/ErrorHandlerModelTest.json", CONTENT_ROOT);
  context.registerService(ImplementationPicker.class, new ResourceTypeBasedResourcePicker());

  MockSlingHttpServletResponse response = new MockSlingHttpServletResponse();
  SlingBindings bindings = new SlingBindings();
  bindings.put(SlingBindings.RESPONSE, response);
  context.request().setAttribute(SlingBindings.class.getName(), bindings);
 }

 @Test
 public void testErrorCode500() {
  String expectedErrorPage = "/content/errorpage/etisalat/language-master/en/error/500";
  context.request().setAttribute("errorCode", "500");
  context.currentResource(ERROR_PAGE);
  context.requestPathInfo().setResourcePath(ERROR_PAGE);
  ErrorHandlerModel model = context.request().adaptTo(ErrorHandlerModel.class);
  assertEquals(expectedErrorPage, model.getErrorPage());
 }

 @Test
 public void testErrorCode404() {
   context.currentResource(ERROR_PAGE);
   context.requestPathInfo().setResourcePath(ERROR_PAGE);
   String expectedErrorPage = "/content/errorpage/etisalat/language-master/en/error/404";
   context.request().setAttribute("errorCode", "404");
   ErrorHandlerModel model = context.request().adaptTo(ErrorHandlerModel.class);
   assertEquals(expectedErrorPage, model.getErrorPage());
  }

}
