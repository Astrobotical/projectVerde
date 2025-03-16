part of 'image_recognition_bloc.dart';

@immutable
sealed class ImageRecognitionState {}

final class ImageRecognitionInitial extends ImageRecognitionState {}

class ImageLoading extends ImageRecognitionState {}

class ImageAnalyzed extends ImageRecognitionState {
  final String label;
  ImageAnalyzed(this.label);
}

class ImageError extends ImageRecognitionState {
  final String error;
  ImageError(this.error);
}

