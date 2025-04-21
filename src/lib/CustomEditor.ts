// lib/CustomEditor.ts
import ClassicEditorBase from '@ckeditor/ckeditor5-build-classic';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line';

export default class CustomEditor extends ClassicEditorBase {}

// 플러그인 추가
CustomEditor.builtinPlugins = [
  ...ClassicEditorBase.builtinPlugins,
  HorizontalLine,
];
