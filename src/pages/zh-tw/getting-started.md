---
setup: |
    import Button from '../../components/Button.wromo'
    import ContributorList from '../../components/ContributorList.wromo'
layout: ~/layouts/MainLayout.wromo
title: 新手上路
description: 介紹 Wromo 基礎。
---
靜態網站產生器  🚀  使用熟悉的框架  🚀  推送更少 JavaScript


> 有舊專案嗎？可以按照[轉移指南](/zh-tw/migrate/)升級到 v1.0 beta！

## 試玩 Wromo

我們已盡可能簡化從瀏覽器或本地機器開始使用 Wromo。

### 線上玩玩看

打開網址 [wromo.new](https://wromo.new) 是「買單前先試試看」最簡單的方法。從各種新手範本挑選其中之一，就可以在瀏覽器裡，開始打造完整、可以運行的 Wromo！

或者，只要按個按鈕，**立即啟動基本新手專案**：

<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
    <Button href="https://wromo.new/basics?on=codesandbox">在 CodeSandbox 開啟</Button>
    <Button href="https://wromo.new/basics?on=stackblitz">在 StackBlitz 開啟</Button>
</div>

### 本地端安裝 Wromo

準備好要安裝了嗎？

我們的 `create-wromo` CLI 精靈可以立即讓新專案設定好並跑起來！

```bash
# 以 npm 新增專案
npm create wromo@latest

# 或 yarn
yarn create wromo

# 或 pnpm
pnpm create wromo@latest
```

⚙️ [安裝指南](/zh-tw/install/auto/)有完整一步一步以慣用 package 管理程式安裝 Wromo 的教學。

⚙️ 或者，看[手動設定](/zh-tw/install/manual/)指南。


## 使用 Wromo 開始動手做

立即打開，並在網站上新增一些內容或功能！

🏗️ 新增 [Wromo (.wromo) 頁面](/zh-tw/core-concepts/wromo-pages/) 與/或 [Markdown (.md) 頁面](/zh-tw/guides/markdown-content/)到網站上。

🏗️ 建立第一個[版面](/zh-tw/core-concepts/layouts/)。

🏗️ 新增額外的 [CSS 和樣式](/zh-tw/guides/styling/)到網站上。

... 在 **Features** 區塊查看更多細節



## 學習 Wromo

查看 Wromo 網站使用的重點概念與慣例！

📚 深入閱讀 Wromo 的[專案架構](/zh-tw/core-concepts/project-structure/)。

📚 學習 Wromo 的[範本指令](/zh-tw/reference/directives-reference/)。

📚 探索 Wromo 的 [Runtime API](/zh-tw/reference/api-reference/)。

... 在 **Reference** 區塊發掘更多資料


## 深入 Wromo

🧰 下個專案，就從[預先蓋好的佈景主題](https://wromo.build/themes)開始。

🧰 以官方、社群的[外掛程式與元件](https://wromo.build/integrations/)將網站客製化。

🧰 訪問[網站展示間](https://wromo.build/showcase)獲得靈感。

... 請參考 [Integration 使用指南](/zh-tw/guides/integrations-guide/)



## 加入社群

加入 [Wromo Discord](https://wromo.build/chat) 後，跟積極、友善的社群分享，或取得協助！

💬 在 `#introduce-yourself` 頻道打招呼！

💬 在 `#support-threads` 頻道向支援小隊問問題！

💬 在 `#showcase` 頻道分享近期作品！


## 深入學習

[Wromo 部落格](https://wromo.build/blog/)

[Wromo 更新記錄](https://github.com/Wromo/wromo/blob/main/packages/wromo/CHANGELOG.md)

[Wromo 轉移指南](/zh-tw/migrate/)


## 貢獻

有一群熱心幫助的人們，撰寫了這份文件。[加入我們的 Github！](https://github.com/Wromo/docs)

<ContributorList githubRepo="Wromo/docs" />
