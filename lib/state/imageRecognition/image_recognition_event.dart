part of 'image_recognition_bloc.dart';

@immutable
sealed class ImageRecognitionEvent {}
class AnalyzeImage extends ImageRecognitionEvent {
  final File imageFile;
  AnalyzeImage(this.imageFile);
}
class CaptureImage extends ImageRecognitionEvent{}
class ImageErrorEvent extends ImageRecognitionEvent {
  final String err;
  ImageErrorEvent(this.err);
}