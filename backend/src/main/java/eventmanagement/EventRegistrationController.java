
package eventmanagement;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/event-registrations")
@CrossOrigin(origins = "*")
public class EventRegistrationController {

    private final EventRegistrationRepository repository;

    public EventRegistrationController(
            EventRegistrationRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<?> register(
            @RequestBody EventRegistration registration) {

        if (registration.getStudentName() == null
                || registration.getStudentName().isBlank()
                || registration.getEmail() == null
                || registration.getEmail().isBlank()
                || registration.getStudentId() == null
                || registration.getStudentId().isBlank()
                || registration.getEventName() == null
                || registration.getEventName().isBlank()) {

            return ResponseEntity.badRequest().body(
                Map.of("message", "Please complete all required fields.")
            );
        }

        if (repository.existsByEmailAndEventName(
                registration.getEmail(),
                registration.getEventName())) {

            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                Map.of("message", "You are already registered for this event.")
            );
        }

        registration.setRegisteredAt(LocalDateTime.now());
        EventRegistration saved = repository.save(registration);

        return ResponseEntity.status(HttpStatus.CREATED).body(
            Map.of(
                "message", "Event registration saved successfully!",
                "id", saved.getId()
            )
        );
    }
}
