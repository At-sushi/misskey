import $ from 'cafy';
import getParams from '../../get-params';
import hashtagChart from '../../../../chart/hashtag';

export const meta = {
	desc: {
		'ja-JP': 'ハッシュタグごとのチャートを取得します。'
	},

	params: {
		span: {
			validator: $.str.or(['day', 'hour']),
			desc: {
				'ja-JP': '集計のスパン (day または hour)'
			}
		},

		limit: {
			validator: $.num.optional.range(1, 100),
			default: 30,
			desc: {
				'ja-JP': '最大数。例えば 30 を指定したとすると、スパンが"day"の場合は30日分のデータが、スパンが"hour"の場合は30時間分のデータが返ります。'
			}
		},

		tag: {
			validator: $.str,
			desc: {
				'ja-JP': '対象のハッシュタグ'
			}
		},
	}
};

export default (params: any) => new Promise(async (res, rej) => {
	const [ps, psErr] = getParams(meta, params);
	if (psErr) return rej(psErr);

	const stats = await hashtagChart.getChart(ps.span as any, ps.limit, ps.tag);

	res(stats);
});