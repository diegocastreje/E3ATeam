package com.e3a.auth;

public class JwtConfig {

    public static final String LLAVE_SECRETA = "el.patio.de.mi.casa.es.particular.7654321";

    public static final String RSA_PRIVATE = "-----BEGIN RSA PRIVATE KEY-----\n" +
            "MIIEowIBAAKCAQEAmmR7Z+IAeU9R8MkRdoBCRsHbf22RLvQEicPmYjSwqwmh2i6l\n" +
            "tWDoUK4843o5j3kyTpOq/0zv2HZgMbCtRwv68VJLy54U0ntylTdHI9AIuU4BRL3/\n" +
            "5//jtD13h6AxdnzxMhgjDyyk39h3zWe3x8MmZ+7E6CMt71dKEfvuxKACUcZ9zBXS\n" +
            "i8cC5wwm1uSyg7pjEkH2d+Xe0EPsapHU0mZcI2eIby4VDMh0lXQXrhgl0i6rSXWL\n" +
            "TTOSyP3pbqimJOqwGGtkCF+l6/eZGGprJzTZZ0YmpaYMMdBANff24fPrnS59vt8g\n" +
            "7NeeQjAv0QXplzsU8gKk8NfzUf/ND9PM8XK0bwIDAQABAoIBAAupR0DjaxG+kfvT\n" +
            "1APVUCwz/DY1ul+Hgsg9CaulOyrQAW+PUmjOtv1RC7xKwQo7JzeUI7hAwWTiHAXk\n" +
            "yFGzb/LGOn9Yo036kP8AO9lSnzYP1Dyy9R86zqIQenS9/r5qVXVpKUy+HH3jxbi3\n" +
            "+sOV09LJ0AmQjqmjOC7/jls/kq1GaLIeA8fikWgyiGqlpYcnG86fdxYzyDL7b5zq\n" +
            "Ce6CTTn4nyL5EgaPV77zp8kNofWgBwlsEOqTO8U/eJwesuR2jnu+lalgtp1P+BkZ\n" +
            "yNqYOla4dNmYHHImYv0btRZyFB9YZg7bi3JRgenM+gi+eUWuaXB2jCjL5Bw/BWFE\n" +
            "Pia/K3ECgYEAzP/Z+yHtMDEvzzLQSNCHu/3pmplR1e47q8duiMMUlk/RS6Thy9AG\n" +
            "ySyIxHtlHEefYHGougB/pRikD6w3E/YboentuO85iVlvVAuodngyHI5u+TJfclat\n" +
            "4hCttGzZbL8OCK9o2ja4QEMDzXv1/rX7A5Zy1PRBDVYEtB6greAvR3UCgYEAwM2K\n" +
            "qehVQcJhHsthq1bmyR+NvvoL/25O3gvU2aIUqCBySdgLRxWWaw72WrZMRkusHcYo\n" +
            "wNIFn6yqo+Qy8N5difoZDrUbxMFbndg4FIWUvRu4r8ZjJZUQ7pDt4fH96xb9HROE\n" +
            "OWAehxiSe3s0A+cpkIliRObDHxKtin+LfAD0s9MCgYEAmRZThVvvkbaZmmS68DVx\n" +
            "t6zFP6NRXq36t6xF2jG8dQeEJ7YovJhMCP2N4RS5DCZcWZxnQQfQSs0c72tO8kQu\n" +
            "nHpiAWH8mJpGLgBKvLXDzll7e/LnHi6myZRk88D5mWEPrOK5LYQBklO5SkFREfZ6\n" +
            "TlKSzH7e+YOMHaplmZM6G2UCgYB/xPbaqFwvqwg/pxp/uKRSrrV51S00Rj6/yelx\n" +
            "nIbB8Fas9x5qKjU3l3/NF7gucaGLTbHeLpCJg5zF5cmYdFRaxsHqTD0tw9HaJdrs\n" +
            "RqYOOJvI6Nj1o/bHkoYC0SKrs91jcnaSq08vyinw6PHMkFmsLk9QR/kQ04jsGqAu\n" +
            "Olfv/wKBgEbpFWUNuIMSIPC9yGOwK4L8eh+/LykzsVSgvy5daqYa2oM1zNtmKTHE\n" +
            "ShaKwKP5EK3JSg+BRpIJ/jCy5IHBg8sEuoxobIy3eZX6Tf01Ge1DqtkPjojUkKul\n" +
            "w+Hzu+ysW/nQBjaAPxCGBf76b/VORMLkMQxqVLOcmlnpDfOLU+lu\n" +
            "-----END RSA PRIVATE KEY-----";

    public static final String RSA_PUBLIC = "-----BEGIN PUBLIC KEY-----\n" +
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmmR7Z+IAeU9R8MkRdoBC\n" +
            "RsHbf22RLvQEicPmYjSwqwmh2i6ltWDoUK4843o5j3kyTpOq/0zv2HZgMbCtRwv6\n" +
            "8VJLy54U0ntylTdHI9AIuU4BRL3/5//jtD13h6AxdnzxMhgjDyyk39h3zWe3x8Mm\n" +
            "Z+7E6CMt71dKEfvuxKACUcZ9zBXSi8cC5wwm1uSyg7pjEkH2d+Xe0EPsapHU0mZc\n" +
            "I2eIby4VDMh0lXQXrhgl0i6rSXWLTTOSyP3pbqimJOqwGGtkCF+l6/eZGGprJzTZ\n" +
            "Z0YmpaYMMdBANff24fPrnS59vt8g7NeeQjAv0QXplzsU8gKk8NfzUf/ND9PM8XK0\n" +
            "bwIDAQAB\n" +
            "-----END PUBLIC KEY-----";

}
