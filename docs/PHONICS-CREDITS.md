# 自然拼读词库与音源

当前覆盖 foundation-data.js 的40类500个生活词条（包括词组、复合词和 T-shirt）。phonics-data.js 是逐词的字形—声音对应表，不在浏览器中按单个字母猜发音；每项字形重新拼合必须等于原词，声音拼合必须等于该词已维护的美式IPA（忽略重音与词间空格）。IPA的既有词典来源见 WORD-IPA-CREDITS.txt。这个约束用于防止漏字、漏音，不能替代英语教师对教学分组的审阅。

单音继续采用俄亥俄州立大学英语口语项目 Philip Neal Whitman 的真人原录音：

- [官方英语教学项目](https://ielp.ehe.osu.edu/sep/resources/interactive-ipa-charts/)
- [English IPA chart / 音频源文档](https://ielp.ehe.osu.edu/files/2025/09/IPA_English.pdf)
- [官方制作说明](https://ielp.ehe.osu.edu/files/2025/09/IPA_Documentation.pdf)

沿用原24段，再从同一文档提取16段，共40个声音示范；没有调用TTS猜读IPA、切割整词录音或拼造双元音。双元音直接使用原文档对应的双元音录音。宽式 /r/ 对应原图的齿龈近音 [ɹ]。新提取文件的控件、源页码、原PCM和WAV校验值见 audio/metadata/phonics-voice.json；原24段元数据见 audio/metadata/foundation-voice.json。

转换仅把PDF的16-bit大端有符号PCM封装成小端WAV，逐个采样数值保持一致，不增益、不剪辑、不变调。用户设置的示范语速仍由播放器统一控制并保留音高；整词跟随所选儿童或成人音色，单音使用共享的标准真人录音，因此整词和官方单音为不同说话人。官方辅音示范带辅助轻元音，页面明确提示不要把它拼入单词。/əl/、/ju/等多声音组合会依次播放所含教学单音，实际连读听整词，不声称这是从词中剪出的自然连读片段。

原文档音频和图形的许可为 Creative Commons Attribution-NonCommercial（未注明版本）；继续限于非商业学习原型，不能声称已获得商业音频授权。作者：Philip Neal Whitman；发布方：The Ohio State University。新文件署名元数据随项目保留。

教学呈现：按原单词分类和顺序练习，支持中英文检索；字母组合、静音字母、上下文读法以黄色提醒，词组保留边界。one、pizza、T-shirt、school、read、close等提供专门说明。三步证据是听音选择、拼出字母组合、实际听完整词；记录练习完成，不作发音评分或“已掌握”判断。

不规则词不宜一律按常见字母音硬拼；教学设计参考[佛罗里达大学识字研究所的不规则与高频词说明](https://ufli.education.ufl.edu/resources/teaching-resources/instructional-activities/irregular-and-high-frequency-words/)，区分可解码部分和需要特别记住的部分。没有使用该机构的音频，也不声称本词库获得该机构认证。覆盖全部现有词条不等于完整、分级的自然拼读课程。

入门课程精选词库中的 100 个不同示例词；长词与特殊读法仍以整词示范为准，不把全部词条视为可直接套规则的词。
