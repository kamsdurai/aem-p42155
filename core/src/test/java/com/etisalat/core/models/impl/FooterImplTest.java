package com.etisalat.core.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.apache.sling.models.impl.ResourceTypeBasedResourcePicker;
import org.apache.sling.models.spi.ImplementationPicker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.etisalat.core.models.Footer;
import com.etisalat.core.models.LinkModel;
import com.etisalat.core.models.QuickLinkModel;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the Footer
 */
@ExtendWith(AemContextExtension.class)
public class FooterImplTest {
	
  private final AemContext context = new AemContext();

  private static final String CONTENT_ROOT = "/content";
  private static final String CURRENT_PAGE = "/content/footerpage";
  
  private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
  protected static final String FOOTER_1 = TEST_PAGE_CONTAINER_ROOT + "/footerpromo";
  protected static final String FOOTER_2 = TEST_PAGE_CONTAINER_ROOT + "/footerquicklinks";
  protected static final String FOOTER_3 = TEST_PAGE_CONTAINER_ROOT + "/footerdownload";
  protected static final String FOOTER_4 = TEST_PAGE_CONTAINER_ROOT + "/footerfollows";
  protected static final String FOOTER_5 = TEST_PAGE_CONTAINER_ROOT + "/footerpayment";
  protected static final String FOOTER_6 = TEST_PAGE_CONTAINER_ROOT + "/footer-links";
  protected static final String FOOTER_7 = TEST_PAGE_CONTAINER_ROOT + "/empty";

  
  @BeforeEach
  public void setup() throws Exception {
    context.addModelsForClasses(FooterImpl.class);
    context.load().json("/com/etisalat/core/models/FooterImplTest.json", CONTENT_ROOT);    
    context.registerService(ImplementationPicker.class, new ResourceTypeBasedResourcePicker());
  }
	
  @Test
  public void testFooterPromoItems() {
    final String expectedFileReference = "/content/dam/etisalat/footer/footer-logo-right.png";
    final String expectedLinkUrl = "https://www.etisalat.ae/en/enterprise-and-government/go-digital/expo-2020.jsp";
    context.currentResource(FOOTER_1);
    final String expectedCopyrightText = "Etisalat. All Rights Reserved.";

    Footer footerModel = context.request().adaptTo(Footer.class);
    LinkModel linkModel = footerModel.getPromo();
        
    assertEquals(expectedFileReference, linkModel.getImgUrl());
    assertEquals(expectedLinkUrl, linkModel.getLinkUrl());
    assertEquals(expectedCopyrightText, footerModel.getCopyrightText());
  }
  
  @Test
  public void testFooterQuickLinks() {
    final String expectedLinkTitle = "Support";
    final String expectedCopyrightText = "Etisalat. All Rights Reserved.";
    context.currentResource(FOOTER_2);

    Footer footerModel = context.request().adaptTo(Footer.class);
    QuickLinkModel quickLinkModel = footerModel.getQuickLinks().get(0);
        
    assertEquals(2, footerModel.getQuickLinks().size());
    assertEquals(expectedLinkTitle, quickLinkModel.getQuickLinkTitle());
    assertEquals(expectedCopyrightText, footerModel.getCopyrightText());
  }

  @Test
  public void testDownloadsLinks() {
	final String expectedFileReference = "/content/dam/etisalat/footer/googlestore.png";
	final String expectedTitle = "download1";
	final String expectedLinkUrl = "/content/etisalat/sample";
    final String expectedCopyrightText = "Etisalat. All Rights Reserved.";
    context.currentResource(FOOTER_3);

    Footer footerModel = context.request().adaptTo(Footer.class);
    LinkModel linkModel = footerModel.getDownload().get(0);        
    assertEquals(1, footerModel.getDownload().size());  
    assertEquals(expectedFileReference, linkModel.getImgUrl());
    assertEquals(expectedTitle, linkModel.getTitle());
    assertEquals(expectedLinkUrl, linkModel.getLinkUrl());
    assertEquals(expectedCopyrightText, footerModel.getCopyrightText());
  }
  
  @Test
  public void testFollowusLinks() {
    final String expectedFileReference = "/content/dam/etisalat/footer/icon-facebook_tcm313-206701.png";
    final String expectedTitle = "icon-facebook";
    final String expectedLinkUrl = "https://www.facebook.com/Etisalat/";
    final String expectedCopyrightText = "Etisalat. All Rights Reserved.";
    context.currentResource(FOOTER_4);

    Footer footerModel = context.request().adaptTo(Footer.class);
    LinkModel linkModel = footerModel.getFollowUs().get(0);        
    assertEquals(3, footerModel.getFollowUs().size());   
    assertEquals(expectedFileReference, linkModel.getImgUrl());
    assertEquals(expectedTitle, linkModel.getTitle());
    assertEquals(expectedLinkUrl, linkModel.getLinkUrl());
    assertEquals(expectedCopyrightText, footerModel.getCopyrightText());
  }
  
  @Test
  public void testPaymentLinks() {
    final String expectedFileReference = "/content/dam/etisalat/footer/icon-amex-card_tcm313-206699.png";
    final String expectedTitle = "icon-amex-card";
    final String expectedCopyrightText = "Etisalat. All Rights Reserved.";
    context.currentResource(FOOTER_5);

    Footer footerModel = context.request().adaptTo(Footer.class);
    LinkModel linkModel = footerModel.getPayment().get(0);         
    assertEquals(4, footerModel.getPayment().size());  
    assertEquals(expectedFileReference, linkModel.getImgUrl());
    assertEquals(expectedTitle, linkModel.getTitle());
    assertEquals(expectedCopyrightText, footerModel.getCopyrightText());
  }
  
  @Test
  public void testFooterLinks() {
    final String expectedLinkText = "About Us";
    final String expectedLinkUrl = "https://www.etisalat.ae/en/footer/about-us.jsp";
    final String expectedCopyrightText = "Etisalat. All Rights Reserved.";
    context.currentResource(FOOTER_6);

    Footer footerModel = context.request().adaptTo(Footer.class);
    LinkModel linkModel = footerModel.getFooterLinks().get(0);        
    assertEquals(2, footerModel.getFooterLinks().size()); 
    assertEquals(expectedLinkText, linkModel.getLinkText());
    assertEquals(expectedLinkUrl, linkModel.getLinkUrl());
    assertEquals(expectedCopyrightText, footerModel.getCopyrightText());
  }
  
  @Test
  public void testEmptyNavList() {
    context.currentResource(FOOTER_7);
    Footer footerModel = context.request().adaptTo(Footer.class);
    assertTrue(footerModel.getFooterLinks().isEmpty());
    assertTrue(footerModel.getPayment().isEmpty());
    assertTrue(footerModel.getFollowUs().isEmpty());
    assertTrue(footerModel.getDownload().isEmpty());
    assertTrue(footerModel.getQuickLinks().isEmpty());   
  }
  

}
