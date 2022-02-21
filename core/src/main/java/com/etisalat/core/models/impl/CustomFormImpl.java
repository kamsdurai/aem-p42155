package com.etisalat.core.models.impl;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.day.cq.wcm.api.Page;
import com.etisalat.core.constants.AEConstants;
import com.etisalat.core.models.CustomForm;
import com.etisalat.core.services.EtisalatApiService;


@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {
		CustomForm.class}, resourceType = {CustomFormImpl.RESOURCE_TYPE})
public class CustomFormImpl implements CustomForm {

	public static final String RESOURCE_TYPE = "etisalat/components/form/container";
	public static final String SENDNOTIFICATION_SELECTOR = ".sendnotification";
	public static final String PROXY_SELECTOR = "proxy";

	@Self
	protected SlingHttpServletRequest request;
	
	@OSGiService
	private EtisalatApiService etisalatApiService;

	@ScriptVariable(injectionStrategy = InjectionStrategy.OPTIONAL)
	private Page currentPage;

	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	@Default(values = "new_form")	
	private String customFormId;

	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	private String customFormRedirect;

	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	private String formSubmissionOptions;

	@Override
	public String getRedirectUrl() {
		if(StringUtils.isNotBlank(customFormRedirect)) {
			return customFormRedirect ;
		}else if(currentPage != null) {
			return currentPage.getPath();
		}
		return StringUtils.EMPTY;
	}

	@Override
	public String getFormAction() {
		if(StringUtils.isNotBlank(formSubmissionOptions) && formSubmissionOptions.equals(SENDNOTIFICATION_SELECTOR)) {
			return currentPage.getPath().concat(AEConstants.JCR_CONSTANT).concat(SENDNOTIFICATION_SELECTOR).concat(AEConstants.HTML_CONSTANT);
		}
		else if(StringUtils.isNotBlank(formSubmissionOptions) && formSubmissionOptions.equals(PROXY_SELECTOR)) {
			return etisalatApiService.getProxyApiUrl();
		}
		return currentPage.getPath().concat(AEConstants.HTML_CONSTANT);
	}

	@Override
	public String getFormId() {		
		return customFormId;
	}

}
