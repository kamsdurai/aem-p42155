package com.etisalat.core.models;

import com.etisalat.core.util.CommonUtility;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import javax.inject.Inject;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CommonLinkModel {

    @Inject
    private String link;

    @SlingObject
    ResourceResolver resourceResolver;

    public String getLink() {
        return CommonUtility.appendHtmlExtensionToPage(resourceResolver, link);
    }

}
