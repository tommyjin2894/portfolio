# RKNN 임베디드 모델 변환

## 한줄 소개
Rockchip AIO3588Q NPU에서 YOLO-World 모델을 실행하기 위한 ONNX → RKNN 변환 및 최적화 작업입니다.

**기간:** 2024.12 ~ 2025.01

## 아키텍처

```mermaid
graph LR
    YOLO["YOLO-World<br/>원본 모델"]
    ONNX["ONNX 변환<br/>내보내기"]
    RKNN["RKNN Toolkit<br/>변환"]
    QUANT["양자화<br/>INT8"]
    DEPLOY["AIO3588Q NPU<br/>추론"]
    RESULT["실시간 객체 감지"]

    YOLO --> ONNX
    ONNX --> RKNN
    RKNN --> QUANT
    QUANT --> DEPLOY
    DEPLOY --> RESULT

    classDef input fill:#ffccbc
    classDef conversion fill:#fff9c4
    classDef deployment fill:#c8e6c9
    classDef output fill:#b3e5fc

    class YOLO input
    class ONNX,RKNN,QUANT conversion
    class DEPLOY deployment
    class RESULT output
```

## 기술 스택

- **원본 모델:** YOLO-World (PyTorch)
- **변환 포맷:** ONNX
- **최적화 도구:** RKNN Toolkit
- **양자화:** INT8
- **대상 NPU:** Rockchip AIO3588Q

## 핵심 기능 및 해결 과제

### 1. YOLO-World 모델 호환성
- **문제:** YOLO-World를 Rockchip NPU에서 직접 실행 불가
- **해결:** ONNX 중간 포맷을 통한 변환, RKNN Toolkit으로 최적화
- **결과:** AIO3588Q에서 정상 추론 가능

### 2. 모델 크기 및 성능 최적화
- **문제:** 원본 모델 크기가 크면 NPU 메모리 부족
- **해결:** INT8 양자화로 모델 크기 75% 감소
- **결과:** 추론 속도 향상 및 메모리 효율성 증대

## 주요 성과

| 지표 | 결과 |
|------|------|
| **모델 변환 성공** | ONNX → RKNN 완료 |
| **양자화 효율** | 75% 크기 감소 (INT8) |
| **추론 플랫폼** | AIO3588Q NPU |
| **적용 분야** | 실시간 객체 감지 |

## 학습 포인트

- RKNN Toolkit 사용법
- YOLO 모델 변환 파이프라인
- Rockchip NPU 기반 모델 최적화
- ONNX 중간 포맷의 역할
