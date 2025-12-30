package io.github.yna87.vuekotlintemplate

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime

@RestController
class HealthCheckController {
    @GetMapping("/health")
    fun health(): HealthResponse =
        HealthResponse(
            status = "healthy",
            timestamp = LocalDateTime.now().toString(),
        )
}

data class HealthResponse(
    val status: String,
    val timestamp: String,
)
