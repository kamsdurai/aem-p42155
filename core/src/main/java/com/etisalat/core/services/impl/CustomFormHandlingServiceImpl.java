package com.etisalat.core.services.impl;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import com.etisalat.core.constants.AEConstants;
import com.etisalat.core.constants.PageConstants;

import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.etisalat.core.services.CustomFormHandlingService;
import com.etisalat.core.util.CommonUtility;

@Component(service = CustomFormHandlingService.class, immediate = true)
public class CustomFormHandlingServiceImpl implements CustomFormHandlingService {

    private static final Logger LOG = LoggerFactory.getLogger(CustomFormHandlingServiceImpl.class);


    @Override
    public int postFormData(String json ,String url, int timeOut, String formName) {
        try {
            final URL postUrl = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) postUrl.openConnection();
            connection.setRequestMethod(AEConstants.POST_METHOD);
            connection.setRequestProperty(AEConstants.CONTENT_TYPE, PageConstants.APPLICATION_JSON);
            connection.setRequestProperty(AEConstants.CLIENT_CAPTCHA_VALUE,CommonUtility.getCaptchaResponse(json));
            connection.setUseCaches(false);
            connection.setDoOutput(true);
            connection.setConnectTimeout(timeOut);
            connection.setReadTimeout(timeOut);

            BufferedWriter wr = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream(), StandardCharsets.UTF_8));
            wr.write(json);
            wr.close();
            connection.connect();
            final int responseCode = connection.getResponseCode();
            LOG.debug("Custom Form Handling API Request for form {} response code is  {}", formName, responseCode);
            connection.disconnect();
            return responseCode;
        }
        catch(SocketTimeoutException e) {
            LOG.error("Custom Form Handling API Request for form {} Time Out {} ", formName, e.getMessage());
            return HttpURLConnection.HTTP_CLIENT_TIMEOUT ;
        }
        catch(IOException e) {
            LOG.error("Custom Form Handling API Request for form {}  Service Connection Failed {}",formName, e.getMessage());
            return HttpURLConnection.HTTP_NOT_FOUND;
        }
    }

}
