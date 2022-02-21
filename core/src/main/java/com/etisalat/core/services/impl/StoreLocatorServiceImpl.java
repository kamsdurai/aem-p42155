package com.etisalat.core.services.impl;

import org.apache.jackrabbit.oak.commons.PropertiesUtil;
import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;

import com.etisalat.core.services.StoreLocatorConfiguration;
import com.etisalat.core.services.StoreLocatorService;

@Component(service = StoreLocatorService.class, immediate = true)
@Designate(ocd = StoreLocatorConfiguration.class)
public class StoreLocatorServiceImpl implements StoreLocatorService {

  @Reference
  private ConfigurationAdmin configAdmin;

  private String storeLocatorUrl;

  @Override
  public String getStoreLocatorUrl() {
    return this.storeLocatorUrl;
  }

  @Activate
  @Modified
  protected void activate(final StoreLocatorConfiguration config) {
    this.storeLocatorUrl = PropertiesUtil.toString(config.getStoreLocatorUrl(),
        "No config store locator url found");

  }

}
