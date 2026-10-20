
package eventmanagement;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (user.getEmail() == null || user.getEmail().isBlank()
                || user.getPassword() == null
                || user.getPassword().length() < 6
                || user.getFullName() == null
                || user.getFullName().isBlank()
                || user.getStudentId() == null
                || user.getStudentId().isBlank()) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Please provide valid registration details.")
            );
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    Map.of("message", "Email is already registered.")
            );
        }

        if (userRepository.existsByStudentId(user.getStudentId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    Map.of("message", "Student ID is already registered.")
            );
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                Map.of(
                        "message", "Account created successfully.",
                        "id", savedUser.getId()
                )
        );
    }
}
