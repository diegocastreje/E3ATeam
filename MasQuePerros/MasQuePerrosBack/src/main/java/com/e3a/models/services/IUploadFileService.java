package com.e3a.models.services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IUploadFileService {
	
	public Resource charge(String nombreFoto) throws MalformedURLException;
	public String copi(MultipartFile archivo) throws IOException;
	public boolean delete(String nombreFoto);
	public Path getPath(String nombreFoto);
}

