package com.etisalat.core.models.impl;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.etisalat.core.constants.AEConstants;
import com.etisalat.core.models.LinkModel;
import com.etisalat.core.models.SiteSearch;
import com.etisalat.core.util.CommonUtility;

@Model(adaptables = { Resource.class, SlingHttpServletRequest.class }, adapters = { SiteSearch.class }, resourceType = {
        SiteSearchImpl.RESOURCE_TYPE })
public class SiteSearchImpl implements SiteSearch {

    public static final String RESOURCE_TYPE = "etisalat/components/search";

    @SlingObject
    @Optional
    private Resource currentRes;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String redirectPage;

    /**
     *
     * @param itemRes
     * @return the items list for quick links and brand items
     */
    private List<LinkModel> getItems(String itemRes) {
        return CommonUtility.getLinkItems(itemRes, currentRes);
    }

    @Override
    public List<LinkModel> getQuickLinksItems() {
        return Collections.unmodifiableList(getItems(AEConstants.QUICKLINKS));
    }

    @Override
    public List<LinkModel> getBrandItems() {
        return Collections.unmodifiableList(getItems(AEConstants.BRAND_ITEMS));
    }

    public String getRedirectPage() {
        return CommonUtility.appendHtmlExtensionToPage(resourceResolver, redirectPage);
    }

}
