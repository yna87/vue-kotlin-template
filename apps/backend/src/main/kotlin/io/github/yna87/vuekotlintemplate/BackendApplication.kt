package io.github.yna87.vuekotlintemplate

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@SpringBootApplication
class BackendApplication {
    @Bean
    fun corsConfigurer() =
            object : WebMvcConfigurer {
                override fun addCorsMappings(registry: CorsRegistry) {
                    registry.addMapping("/**")
                            .allowedOrigins("http://localhost:5173")
                            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                            .allowedHeaders("*")
                            .allowCredentials(true)
                }
            }
}

fun main(args: Array<String>) {
    runApplication<BackendApplication>(*args)
}
