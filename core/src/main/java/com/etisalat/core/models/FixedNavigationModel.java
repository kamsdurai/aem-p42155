package com.etisalat.core.models;

import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.etisalat.core.constants.AEConstants;
import com.etisalat.core.util.CommonUtility;

@Model(adaptables = {Resource.class,
    SlingHttpServletRequest.class})
public class FixedNavigationModel {

  private static final Logger LOG = LoggerFactory.getLogger(FixedNavigationModel.class);

  @SlingObject
  private SlingHttpServletRequest request;

  @SlingObject
  @Optional
  protected Resource currentResource;
  
  @SlingObject
  private ResourceResolver resourceResolver;

  /**
   * 
   * @return a collection of objects representing the fixed navigation items that compose the  list.
   */
  public List<FixedNavigtaionMultifieldModel> getFixedNav() {
    LOG.info("current resource is {}", currentResource.getPath());
    final List<FixedNavigtaionMultifieldModel> pageItemList = CommonUtility
        .getFixedNavigationItems(AEConstants.MULTIFIELD_NODE, currentResource, resourceResolver);
    if (pageItemList.isEmpty()) {
      LOG.error("Fixed Navigation List is empty {}", currentResource.getPath());
    }

    return pageItemList;
  }
}
