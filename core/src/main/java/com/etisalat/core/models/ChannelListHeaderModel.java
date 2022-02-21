package com.etisalat.core.models;

import com.etisalat.core.util.CommonUtility;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {Resource.class,
        SlingHttpServletRequest.class})
public class ChannelListHeaderModel {

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String logoLink;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String link;


    @SlingObject
    ResourceResolver resourceResolver;

    public String getLink() {
        return CommonUtility.appendHtmlExtensionToPage(resourceResolver, link);
    }

    public String getLogoLink() {
        return CommonUtility.appendHtmlExtensionToPage(resourceResolver, logoLink);
    }


}
