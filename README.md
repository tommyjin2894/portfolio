# 박진형 | Edge AI Engineer

> 모델 학습 이후의 변환, 최적화, 디바이스 배포, 운영 문제를 해결하는 Edge AI / On-device AI 엔지니어를 지향합니다.

**Contact:** tommyjin2894@gmail.com · [github.com/tommyjin2894](https://github.com/tommyjin2894)
**Status:** 이직 준비 중

---

## Summary

Edge AI / On-device AI 엔지니어. Jetson Orin, NPU, ONNX 변환, 로컬 LLM/TTS 배포 경험 보유. 공공기관 노인 케어 음성 비서를 1인 용역으로 개발하며 ASR·LLM·TTS·센서·스케줄·긴급 알림·케어센터 연동을 단일 Jetson 시스템에 통합했습니다.

## Core Signals

- **공공기관 노인 케어 음성 비서** — 1인 용역으로 소프트웨어 전 영역 담당, 2026.05 납품 예정
- **Jetson Orin 런타임 메모리 약 750MB 절감** — Docker 4컨테이너 구조를 단일 Python 프로세스로 재구성
- **NPU 2종 포팅** — Kneron KL630, Rockchip RK3588에 객체 탐지 모델 변환 및 추론 파이프라인 구성
- **ONNX 그래프 수술** — NMS/detect 등 NPU 미지원 후처리를 그래프에서 분리하고 CPU SDK 후처리로 통합
- **로컬 LLM 파이프라인** — Self-Instruct 합성 데이터 → Qwen LoRA → merge → GGUF Q4_K_M → Ollama 등록 자동화
- **Vision 모델 학습** — YOLOv5s 6클래스 Fire/PPE Detection mAP@0.5 84.7%
- **MCP 릴레이 서버** — 3계층 WebSocket 릴레이와 53개 테스트 케이스 구성

## Tech Stack

| 영역 | 핵심 기술 |
|------|-----------|
| **Language** | Python · C |
| **Edge / Runtime** | Jetson Orin · Linux · PM2 · Docker · ESP-IDF |
| **NPU / Model Conversion** | ONNX · Netron · Kneron Toolchain · RKNN Toolkit · ONNX Runtime |
| **AI / ML** | PyTorch · YOLOv5 · Qwen · PEFT · TRL · LoRA |
| **Voice / LLM** | Faster-Whisper · CTranslate2 · Silero-VAD · Piper TTS · llama.cpp · GGUF · Ollama |
| **Backend** | aiohttp · FastAPI · WebSocket · MQTT · SQLite · Nginx · FastMCP |

---

## Projects

### 01. AIBOO — Edge AI 음성 비서 (Jetson Orin)

공공기관(보훈부) 노인 케어 사업을 위한 Jetson Orin 기반 음성 비서. 오픈소스 음성 비서 구조를 베이스로, Jetson 단일 장치 운영에 맞게 런타임을 재구성하고 공공기관 케어 도메인 기능을 확장 구현했습니다.

| 기간 | 역할 | 상태 |
|------|------|------|
| 2025.02 ~ 현재 | 1인 용역 — 백엔드, 대시보드, Jetson 런타임, ESP32 오디오 펌웨어 수정·튜닝, 케어센터 API 연동 | 2026.05 납품 예정 |

**Stack:** Jetson Orin · aiohttp · Faster-Whisper · CTranslate2 · Silero-VAD · Piper TTS · MQTT · SQLite · PM2 · ESP-IDF

**핵심 기여**

- **메모리 약 750MB 절감** — Docker 4컨테이너 음성 비서 구조를 단일 Python 프로세스로 통합하고 핵심 서비스만 PM2로 분리 운영
- **단일 Jetson 시스템 통합** — ASR·LLM·TTS·MQTT 센서·스케줄·긴급 알림·케어센터 API 연동을 하나의 런타임 흐름으로 연결
- **Jetson 런타임 환경 구축** — PyTorch, CTranslate2, ONNX Runtime의 검증된 버전 조합 고정 및 CTranslate2 CUDA 빌드 구성
- **SQLite WAL 적용** — 스케줄, MQTT, WebSocket 컴포넌트의 동시 쓰기 상황을 고려한 저장 안정화
- **ESP32 오디오 스트리밍 수정·튜닝** — I2S Split 구성과 XVF3800 I2C 초기화 시퀀스 반영

### 02. Qwen LoRA 파인튜닝 + 로컬 LLM 배포 파이프라인

AIBOO 음성 비서의 로컬 LLM 후보를 만들기 위해 합성 데이터 생성, LoRA 학습, 모델 병합, GGUF 양자화, Ollama 등록까지 자동화했습니다.

| 기간 | 연계 | 카테고리 |
|------|------|----------|
| 2025.12 ~ 현재 | AIBOO LLM 모듈 | LLM · Voice AI |

**Stack:** Qwen · PEFT · TRL · llama.cpp · GGUF Q4_K_M · Ollama

**핵심 기여**

- **Self-Instruct 합성 데이터셋 구축** — 로컬 상위 OSS LLM을 이용해 다양한 상황·감정 톤의 instruction/output 생성
- **음성 입력 최적화** — 구두점 최소화, 구어체, 간투사, 불완전한 띄어쓰기 등 STT 결과에 가까운 입력 스타일 반영
- **4개 Qwen 크기 비교 학습** — Qwen2.5 0.5B/1.5B, Qwen3 1.7B/4B 계열을 LoRA로 비교
- **로컬 서빙 자동화** — LoRA merge → HF 모델 → GGUF 변환 → Q4_K_M 양자화 → Ollama Modelfile 등록

### 03. Multi-NPU 모델 포팅 (Kneron KL630 + Rockchip RK3588)

서로 다른 NPU 아키텍처에 객체 탐지 모델을 포팅하기 위한 변환 및 후처리 분리 파이프라인을 구성했습니다.

| 기간 | 연계 | 카테고리 |
|------|------|----------|
| 2025.02 ~ 2025.09 | Fire/PPE Detection 모델 | Edge AI · Model Deployment |

**Stack:** Kneron Toolchain · RKNN Toolkit · ONNX · Netron · C · Docker

**핵심 기여**

- **ONNX 그래프 수술** — NMS/detect 등 NPU 미지원 후처리 노드를 ONNX 그래프에서 제거하고 모델 본체 출력 유지
- **Kneron KL630 변환** — ONNX → BIE → NEF 변환 파이프라인 구성
- **Rockchip RK3588 변환** — RKNN Toolkit 기반 INT8 변환 및 추론 검증 흐름 구성
- **CPU 후처리 통합** — SDK 레퍼런스 후처리를 임베디드 실행 환경에 맞게 통합

### 04. Fire/PPE Detection + RTSP 모니터링

산업 현장 안전 시나리오를 위한 YOLOv5s 6클래스 학습과 실시간 RTSP 모니터링을 구현했습니다.

| 기간 | 결과 | 카테고리 |
|------|------|----------|
| 2025.02 ~ 2025.09 | mAP@0.5 84.7% | Vision · Model Training |

**Stack:** YOLOv5 · PyTorch · OpenCV · Streamlit · RTX 4090

**핵심 기여**

- 화재, 연기, 안전모, 안전조끼, 사람, 머리 6클래스 YOLOv5s 모델 학습
- Kaggle/웹 공개 데이터셋의 서로 다른 라벨 정의를 6클래스 체계로 정합
- 희소 클래스 복제·변형으로 데이터 불균형 완화
- RTSP 카메라 연동 OpenCV 추론과 Streamlit 대시보드 구현

### 05. MCP 도구 릴레이 서버 (FastMCP 기반)

AIBOO에서 외부 도구 호출을 안정적으로 연결하기 위한 3계층 WebSocket 릴레이 서버입니다.

| 기간 | 연계 | 카테고리 |
|------|------|----------|
| 2026.03 ~ 현재 | AIBOO 도구 모듈 | Backend · Agent Tooling |

**Stack:** FastAPI · FastMCP · WebSocket · pytest · Gemini · Kakao Local

**핵심 기여**

- 소비자 ↔ 서버 ↔ 파이프 ↔ stdio 도구의 3계층 WebSocket 릴레이 구성
- JSON-RPC ID 변환과 양방향 메시지 라우팅 구현
- exponential backoff 기반 stdio ↔ WebSocket 자동 재연결 처리
- 토큰 기반 인증 구현
- AI 에이전트를 활용해 서버/도구/파이프/유틸 모듈 대상 53개 테스트 케이스 생성

### 06. Piper TTS 한국어 Fine-tuning + G2P 토크나이저 통합

한국어 음성 AI 실험 경험. Piper 한국어 모델 fine-tuning, 한국어 G2P 토크나이저 통합, 다중 체크포인트 ONNX export 및 청취 평가 자동화를 진행했습니다.

| 기간 | 결과 | 카테고리 |
|------|------|----------|
| 2025.11 | 15개 체크포인트 ONNX export 및 동일 문장 비교 | Voice AI |

**Stack:** PyTorch Lightning · Piper TTS · 한국어 G2P · ONNX · espeak-ng

---

## Other Projects

- **Telemedicine 백엔드** — WebRTC 기반 1:N 화상 진료 PoC 백엔드, Coturn/TURN 서버 및 WebSocket 시그널링 구현
- **GPT-SoVITS 한국어 TTS 추론 서버** — GPT-SoVITS 기반 한국어 TTS FastAPI 추론 서버 구현

## Career

| 기간 | 소속 | 역할 |
|------|------|------|
| 2025.02 ~ 현재 | 루커스 (Lukus) AI연구소 | 연구원 |
| 2024 | KDT AI 부트캠프 (이스트소프트 주관) | 최우수 수강생 / 경량화 AI 프로젝트 대상 |
| 2021.07 ~ 2024.01 | 성한 디앤티 (Sunghan D&T) | 주임 (설계팀) |

## Education

**강원대학교 (구. 강릉원주대학교)** 자동차공학과 (학사) — 전공 평점 4.16 / 4.5

## Contact

- Email: tommyjin2894@gmail.com
- GitHub: [github.com/tommyjin2894](https://github.com/tommyjin2894)
- Portfolio: [portfolio.tmpark.space](https://portfolio.tmpark.space)
