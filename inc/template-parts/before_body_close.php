<?php
if (isset($scripts))
{
  foreach ($scripts as $script)
  {
  ?>
    <script type="text/javascript" src="<?=$script?>"></script>
  <?php
  }
}
?>
</body>
</html>