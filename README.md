# Calculator App 🧮

Modern, Angular tabanlı hesap makinesi uygulaması. REST API entegrasyonu ve gerçek zamanlı işlem geçmişi ile gelişmiş hesaplama özellikleri sunar.

## 🚀 Özellikler

### ✨ Temel Hesaplamalar
- **Toplama** (+)
- **Çıkarma** (-)
- **Çarpma** (*)
- **Bölme** (/)
- **Üs alma** (^)
- **Karekök** (√)

### 🔗 API Entegrasyonu
- REST API üzerinden gerçek hesaplamalar
- `http://s1.divlop.com:5001` backend sunucusu
- JWT token authentication
- Error handling ve fallback mekanizması

### 📝 İşlem Geçmişi
- Gerçek zamanlı işlem kaydı
- Zaman damgası ile işlem listesi
- API'den merkezi geçmiş yönetimi
- Geçmiş temizleme özelliği

### 🎨 Modern UI/UX
- Responsive tasarım
- Modern glassmorphism efektleri
- Hover ve click animasyonları
- Mobile-first yaklaşım

## 🏗️ Teknik Yapı

### 📁 Proje Organizasyonu
```
src/
├── app/
│   ├── components/          # UI Bileşenleri
│   │   ├── calculator/      # Ana hesap makinesi
│   │   ├── button/          # Özel buton bileşeni
│   │   └── display/         # Ekran bileşeni
│   ├── services/            # İş Mantığı
│   │   ├── calculator-api.service.ts    # API entegrasyonu
│   │   ├── calculator.service.ts        # Hesaplama mantığı
│   │   └── history.service.ts           # Geçmiş yönetimi
│   ├── models/              # Tip Tanımlamaları
│   │   ├── calculation.model.ts         # Interface'ler ve Enum'lar
│   │   └── index.ts                     # Barrel exports
│   ├── pipes/               # Özel Pipe'lar
│   │   └── double-digit-pipe.ts         # Sayı formatlama
│   └── environments/        # Ortam Ayarları
│       ├── environment.ts               # Development
│       └── environment.prod.ts          # Production
├── proxy.conf.js           # API Proxy Konfigürasyonu
└── proxy.conf.json         # Alternatif proxy ayarı
```

### 🔧 Teknolojiler
- **Angular 18.x** - Frontend framework
- **TypeScript** - Tip güvenli programlama
- **SCSS** - Gelişmiş CSS
- **RxJS** - Reactive programming
- **HttpClient** - API iletişimi

### 📊 Veri Modelleri
```typescript
// API Request Model
interface CalculationRequest {
  parameter1: number;
  parameter2?: number;
}

// API Response Model
interface CalculationResponse {
  result: number;
  operation: string;
  timestamp: string;
}

// History Model
interface HistoryItem {
  id: string;
  operation: OperationType;
  parameter1: number;
  parameter2?: number;
  result: number;
  date: number;
}
```

## 🛠️ Kurulum ve Çalıştırma

### Gereksinimler
- **Node.js** 18.x veya üzeri
- **npm** 9.x veya üzeri
- **Angular CLI** 18.x

### 1️⃣ Projeyi İndirin
```bash
git clone <repository-url>
cd calculator
```

### 2️⃣ Bağımlılıkları Yükleyin
```bash
npm install
```

### 3️⃣ Ortam Değişkenlerini Ayarlayın
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://s1.divlop.com:5001/api',
  apiToken: 'YOUR_API_TOKEN_HERE'
};
```

### 4️⃣ Development Server'ı Başlatın
```bash
# Proxy ile (Önerilen)
ng serve --proxy-config proxy.conf.js

# Veya normal mod
ng serve
```

### 5️⃣ Uygulamayı Açın
Tarayıcınızda `http://localhost:4200` adresine gidin.

## 🌐 API Kullanımı

### Base URL
```
http://s1.divlop.com:5001/api
```

### Endpoints
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/calculator/add` | Toplama |
| POST | `/calculator/subtract` | Çıkarma |
| POST | `/calculator/multiply` | Çarpma |
| POST | `/calculator/divide` | Bölme |
| POST | `/calculator/power` | Üs alma |
| POST | `/calculator/squareRoot` | Karekök |
| GET | `/history/getHistory` | Geçmiş listesi |
| DELETE | `/history/clearHistory` | Geçmiş temizleme |

### Request Format
```json
{
  "parameter1": 5.0,
  "parameter2": 3.0
}
```

### Response Format
```json
{
  "result": 8.0,
  "operation": "ADDITION",
  "timestamp": "2024-01-15T14:30:00Z"
}
```

## 🏗️ Build ve Deploy

### Production Build
```bash
ng build --configuration production
```

### Build Çıktısı
```
dist/calculator/
├── index.html
├── main.js
├── polyfills.js
└── styles.css
```

### Environment Konfigürasyonu
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://production-api.com/api',
  apiToken: 'PRODUCTION_TOKEN'
};
```

## 🧪 Test

### Unit Tests
```bash
ng test
```

### E2E Tests
```bash
ng e2e
```

### Coverage Report
```bash
ng test --code-coverage
```

## 🎯 Geliştirme Notları

### Code Style
- **ESLint** ve **Prettier** kullanılıyor
- **TypeScript strict mode** aktif
- **Angular best practices** uygulanıyor

### State Management
- Component-based state management
- Service injection pattern
- RxJS observable streams

### Error Handling
- HTTP interceptor kullanımı
- Graceful fallback mekanizması
- User-friendly error messages

### Performance
- OnPush change detection strategy
- Lazy loading ready architecture
- Optimized bundle size

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit atın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Sorularınız için lütfen issue açın veya iletişime geçin.

---

**Angular Version:** 18.x  
**Last Updated:** Aralık 2024  
**Status:** ✅ Active Development
