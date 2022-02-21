package com.etisalat.core.models.impl;

import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.etisalat.core.constants.AEConstants;
import com.etisalat.core.models.FixedNavigtaionMultifieldModel;
import com.etisalat.core.models.PageNavigation;
import com.etisalat.core.util.CommonUtility;

@Model(
		adaptables = {Resource.class, SlingHttpServletRequest.class},
		adapters = { PageNavigation.class				},
		resourceType = {PageNavigationImpl.RESOURCE_TYPE})
public class PageNavigationImpl implements PageNavigation {
	
  private static final Logger LOG = LoggerFactory.getLogger(PageNavigationImpl.class);

  /**
   * The resource type.
   */
  protected static final String RESOURCE_TYPE = "etisalat/components/pagenavigation";

  /**
   * The current currentRes.
   */
  @SlingObject
  protected Resource currentRes;

  @SlingObject
  private ResourceResolver resourceResolver;

  @Override
  public List<FixedNavigtaionMultifieldModel> getPageNavItems() {
	  final List<FixedNavigtaionMultifieldModel> pageItemList = CommonUtility
				.getFixedNavigationItems(AEConstants.PAGE_CHILD_ITEMS, currentRes, resourceResolver);
	if (pageItemList.isEmpty()) {
	  LOG.error("Page Navigation List is empty {}", currentRes);
	}
	return CommonUtility.getFixedNavigationItems(AEConstants.PAGE_CHILD_ITEMS, currentRes, resourceResolver);
  }
}
