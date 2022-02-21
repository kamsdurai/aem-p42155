package com.etisalat.core.services;


import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Etisalat API's Form Configuration", description = "Configurations details for Key and Url")
public @interface EtisalatApiConfiguration {

    int TIMEOUT = 7000;
    String CONTACTUSFORMAPIURL = "https://azspringcloudsvc-etisalat-email-sender.azuremicroservices.io/emailapp/sendNotification";
    String PROXYAPIURL = "http://proxyreport.etisalat.ae/pages/rproxy/r_proxy_ctrl.jsp";
    
    @AttributeDefinition(name = "Contact Us Api url", description = "Contact Us  Form Url")
    String getContactUsApiUrl() default CONTACTUSFORMAPIURL;
    
    @AttributeDefinition(name = "Proxy Api url", description = "Proxy Form Url")
    String getProxyApiUrl() default PROXYAPIURL;

    @AttributeDefinition(name = "set time out", description = "Set Time out")
    int getSetTimeout() default TIMEOUT;

}

