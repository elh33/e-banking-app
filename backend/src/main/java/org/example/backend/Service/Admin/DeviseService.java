package org.example.backend.Service.Admin;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.example.backend.Model.DeviseEntity;
import org.example.backend.Repository.Admin.DeviseRepository;
import org.example.backend.Util.Devise;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeviseService {

    private static final Devise DEVISE_BASE = Devise.MAD; // Devise de référence de l'application
    private static final String API_KEY = "2748c85a06a3172e22d21cd671a5fd73";

    private DeviseRepository deviseRepository;

    public DeviseService(DeviseRepository deviseRepository) {
        this.deviseRepository = deviseRepository;
    }

    public DeviseEntity activerDevise(Devise code) throws Exception {
        Optional<DeviseEntity> existing = deviseRepository.findByCode(code);
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Devise déjà existante");
        }

        double taux;
        if (code == DEVISE_BASE) {
            taux = 1.0;
        } else {
            taux = calculerTauxParRapportABase(code, DEVISE_BASE);
        }

        DeviseEntity deviseEntity = new DeviseEntity();
        deviseEntity.setCode(code);
        deviseEntity.setTauxChange(taux);
        deviseEntity.setActive(true);

        return deviseRepository.save(deviseEntity);
    }

    private double calculerTauxParRapportABase(Devise cible, Devise base) throws Exception {
        String url = "https://api.exchangerate.host/live?access_key=" + API_KEY
                + "&currencies=" + base.name() + "," + cible.name();

        URL u = new URL(url);
        HttpURLConnection conn = (HttpURLConnection) u.openConnection();
        conn.setRequestMethod("GET");

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
            StringBuilder responseStr = new StringBuilder();
            String inputStr;
            while ((inputStr = reader.readLine()) != null)
                responseStr.append(inputStr);

            JSONObject json = new JSONObject(responseStr.toString());

            if (!json.getBoolean("success")) {
                throw new RuntimeException("Erreur API : " + json);
            }

            JSONObject quotes = json.getJSONObject("quotes");
            double usdToBase = quotes.getDouble("USD" + base.name());
            double usdToCible = quotes.getDouble("USD" + cible.name());

            return usdToBase / usdToCible;
        }
    }

    public void supprimerDevise(Long id) {
        deviseRepository.deleteById(id);
    }

    public Iterable<DeviseEntity> getDevisesActives() {
        return deviseRepository.findByActiveTrue();
    }
    public DeviseEntity mettreAJourTaux(Devise code) throws Exception {
        Optional<DeviseEntity> optional = deviseRepository.findByCode(code);
        if (optional.isEmpty()) {
            throw new IllegalArgumentException("Devise non trouvée");
        }

        DeviseEntity entity = optional.get();

        if (code == DEVISE_BASE) {
            entity.setTauxChange(1.0); // Devise de base
        } else {
            double nouveauTaux = calculerTauxParRapportABase(code, DEVISE_BASE);
            entity.setTauxChange(nouveauTaux);
        }

        return deviseRepository.save(entity); // met à jour dans la base
    }

}
