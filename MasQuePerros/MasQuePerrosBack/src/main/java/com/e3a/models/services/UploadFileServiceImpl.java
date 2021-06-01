package com.e3a.models.services;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class UploadFileServiceImpl implements IUploadFileService {
	
	private final Logger log = LoggerFactory.getLogger(UploadFileServiceImpl.class);
	private final static String DIRECTORIO_UPLOAD = "uploads";
	
	@Override
	public Resource charge(String pictureName) throws MalformedURLException {
		Path rutaArchivo = getPath(pictureName);
		log.info(rutaArchivo.toString());
		Resource recurso = new UrlResource(rutaArchivo.toUri());
		
		if(!recurso.exists() && !recurso.isReadable()) {
			
			rutaArchivo = Paths.get("src/main/resources/static/img").resolve("bone.png").toAbsolutePath();
			recurso = new UrlResource(rutaArchivo.toUri());
			log.error("Error no se pudo cargar la imagen: "+ pictureName);
			
		}
		return recurso;
	}

	@Override
	public String copi(MultipartFile file) throws IOException {
		
		String fileName =UUID.randomUUID().toString() + "_" + file.getOriginalFilename().replace(" ", "");
		Path fileRoute = getPath(fileName);
		log.info(fileRoute.toString());
		Files.copy(file.getInputStream(), fileRoute);
		
		return fileName;
	}

	@Override
	public boolean delete(String fileName) {
		if(fileName != null && fileName.length() >0) {
			Path previousRouteFile =getPath(fileName);
			File previousPictureFile = previousRouteFile.toFile();
			if(previousPictureFile.exists() && previousPictureFile.canRead()) {
				previousPictureFile.delete();
				return true;
			}
		}
		return false;
	}

	@Override
	public Path getPath(String fileName) {
		if (fileName != null) {
			return Paths.get(DIRECTORIO_UPLOAD).resolve(fileName).toAbsolutePath();
		} else {
			return Paths.get("src/main/resources/static/img").resolve("bone.png").toAbsolutePath();
		}
	}

}
