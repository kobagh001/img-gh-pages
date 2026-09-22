# img-gh-pages

GitHub Pages image gallery site built with Eleventy. Automatically optimizes images and deploys via GitHub Actions.

## コントリビューター向け: 画像の追加方法

このギャラリーに画像を追加するには、`src/images/` ディレクトリに画像ファイルと対応するYAMLメタデータファイルをプッシュします。

### 手順

1. 画像ファイル（JPG, PNG, GIF, SVG, WebPなど）を `src/images/` に配置
2. 同じベース名のYAMLファイル（例: `myphoto.jpg` → `myphoto.yml`）を作成
3. YAMLファイルに以下のメタデータを記述
4. `develop` ブランチに変更をプッシュして GitHub Actions による自動デプロイをトリガー

### YAMLメタデータ形式

```yaml
title: 画像のタイトル
author: 投稿者名
date: YYYY-MM-DD 形式の日付
tags:
  - タグ1
  - タグ2
  - タグ3
description: 画像の詳細な説明（省略可能）
```

### 例

- `src/images/sample.jpg`
- `src/images/sample.yml`

```yaml
title: サンプル画像
author: テストユーザー
date: 2026-09-22
tags:
  - サンプル
  - テスト
description: これはギャラリーのサンプル画像です。EleventyとGitHub Actionsを使ったGitHub Pagesサイトの動作確認用です。
```

### ローカルプレビュー

```bash
# 依存関係をインストール
npm ci

# ローカルサーバーを起動
npx @11ty/eleventy --serve
```

ブラウザで http://localhost:8080 を開いてプレビューできます。

### デプロイ

- `develop` ブランチへのプッシュをトリガーにGitHub Actionsが実行されます
- Eleventyでサイトをビルドし、`gh-pages` ブランチにデプロイします
- GitHub PagesのURLは `https://<username>.github.io/<repository>/` です

### 注意点

- 画像ファイルとYAMLファイルのベース名を一致させてください（拡張子は異なります）
- YAMLファイルがない場合は、デフォルト値（空文字列）が使用されます
- 画像は自動的に複数サイズとWebP形式に最適化されます