package com.etisalat.core.services.impl;

import com.etisalat.core.constants.AEConstants;
import org.apache.jackrabbit.oak.commons.PropertiesUtil;
import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;

import com.etisalat.core.services.EtisalatApiConfiguration;
import com.etisalat.core.services.EtisalatApiService;

@Component(service = EtisalatApiService.class, immediate = true)
@Designate(ocd = EtisalatApiConfiguration.class)
public class EtisalatApiServiceImpl implements EtisalatApiService {

	@Reference
	private ConfigurationAdmin configAdmin;
	private String contactUsApiUrl;
	private String proxyApiUrl;
	private int timeOut;

	@Activate
	@Modified
	protected void activate(final EtisalatApiConfiguration config) {
		this.contactUsApiUrl = PropertiesUtil.toString(config.getContactUsApiUrl(), AEConstants.NO_CONFIG_FOUND);
		this.proxyApiUrl = PropertiesUtil.toString(config.getProxyApiUrl(), AEConstants.NO_CONFIG_FOUND);
		this.timeOut = PropertiesUtil.toInteger(config.getSetTimeout(), 6000);
	}
	
	@Override
	public String getContactUsApiUrl() {
		return this.contactUsApiUrl;
	}
	
	@Override
	public String getProxyApiUrl() {
		return this.proxyApiUrl;
	}
	
	@Override
	public int getTimeOut() {
		return this.timeOut;
	}

}
