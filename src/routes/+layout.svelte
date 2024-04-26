<script>
	import '../app.pcss';
</script>
<header class="bg-white">
    <div class="mx-auto px-4 flex justify-between items-center border-b border-gray-200 sticky mb-10 pt-2">
      <a href="/" class="mr-auto mb-1.5">
        <img src="MLogo.png" alt="Logo" style="width: 24%;">
      </a>
      <nav class="space-x-4 pb-2">
        <a href="/Eleves" class="text-gray-700 hover:text-gray-900">Eleves</a>
        <a href="/Professeurs" class="text-gray-700 hover:text-gray-900">Professeurs</a>
        <a href="#" class="text-gray-700 hover:text-gray-900">Classes</a>
        <a href="#" class="text-gray-700 hover:text-gray-900">Matières</a>
        <a href="#" class="text-gray-700 hover:text-gray-900">Notes</a>

      </nav>
    </div>
  </header>
<slot />
