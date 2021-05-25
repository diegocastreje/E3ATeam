package com.e3a.utilities;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class Reader {
	Properties properties = null;
	public Reader(){
		properties = new Properties();
		try {
			File route = new File("./src/main/resources/static/strings.properties");
			System.out.println(route.getAbsolutePath());
			properties.load(new FileInputStream(route));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public String getString(String term) {
		return properties.getProperty(term);
	}
	
}
