export const prerender = false;

import type { APIRoute } from 'astro';
import puppeteer from 'puppeteer';

export const GET: APIRoute = async () => {
	let browser;
	try {
		browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});

		const page = await browser.newPage();

		// Set A4 viewport
		await page.setViewport({ width: 794, height: 1123 });

		// Navigate to the exam page (wait for KaTeX to render)
		await page.goto('http://localhost:4322/wiki', {
			waitUntil: 'networkidle0',
			timeout: 30000,
		});

		// Wait a bit more for KaTeX fonts to load
		await page.waitForTimeout(1500);

		// Generate PDF in A4 size
		const pdfBuffer = await page.pdf({
			format: 'A4',
			printBackground: true,
			margin: {
				top: '15mm',
				bottom: '15mm',
				left: '12mm',
				right: '12mm',
			},
		});

		return new Response(pdfBuffer, {
			status: 200,
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename="중2-1_수학_기말고사_대비.pdf"',
				'Cache-Control': 'no-cache',
			},
		});
	} catch (error) {
		console.error('PDF generation error:', error);
		return new Response(JSON.stringify({ error: 'PDF 생성 실패', detail: String(error) }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	} finally {
		if (browser) await browser.close();
	}
};
