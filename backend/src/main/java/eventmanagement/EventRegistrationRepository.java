
package eventmanagement;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRegistrationRepository
        extends JpaRepository<EventRegistration, Long> {

    List<EventRegistration> findByEmail(String email);

    boolean existsByEmailAndEventName(String email, String eventName);
}
